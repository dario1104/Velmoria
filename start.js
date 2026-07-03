#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const BACKEND = path.join(ROOT, 'backend');
const FRONTEND = path.join(ROOT, 'frontend');
const IS_WIN = os.platform() === 'win32';

const flags = { noStart: false };
for (const arg of process.argv.slice(2)) {
  if (arg === '--no-start')  flags.noStart = true;
}

function log(tag, msg) {
  const ts = new Date().toLocaleTimeString('it-IT');
  console.log(`[${ts}][${tag}] ${msg}`);
}

function openBrowser(url) {
  const platform = os.platform();
  const detached = spawn(
    platform === 'darwin' ? 'open' :
    platform === 'win32' ? 'cmd' :
    'xdg-open',
    platform === 'win32' ? ['/c', 'start', url] : [url],
    { stdio: 'ignore', detached: true }
  );
  detached.unref();
}

function installDeps(dir, label) {
  const nm = path.join(dir, 'node_modules');
  if (require('fs').existsSync(nm)) {
    try {
      execSync('npm ls --depth=0', { cwd: dir, stdio: 'pipe' });
      log('INSTALL', `${label}: dipendenze già presenti`);
      return;
    } catch {
      log('INSTALL', `${label}: dipendenze mancanti, reinstallo...`);
    }
  }
  log('INSTALL', `${label}: npm install in corso...`);
  execSync('npm install', { cwd: dir, stdio: 'inherit' });
  log('INSTALL', `${label}: completato`);
}

async function main() {
  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('         Velmoria — Avvio progetto          ');
  console.log('═══════════════════════════════════════════');
  console.log('');
  console.log('  Flags:');
  console.log('  --no-start   solo setup (senza avviare i servizi)');
  console.log('');

  installDeps(BACKEND, 'Backend');
  installDeps(FRONTEND, 'Frontend');
  console.log('');

  const dbUrl = require('fs').readFileSync(path.join(BACKEND, '.env'), 'utf-8')
    .split(/\r?\n/).find(l => l.startsWith('DATABASE_URL='))
    ?.replace(/^DATABASE_URL=["']?|["']?\r?$/g, '') || '';

  const prismaEnv = { ...process.env, DATABASE_URL: dbUrl };

  log('PRISMA', 'Generazione client Prisma...');
  execSync('npx prisma generate', { cwd: BACKEND, stdio: 'inherit', env: prismaEnv });
  log('PRISMA', 'Client Prisma generato');
  console.log('');

  log('PRISMA', 'Applicazione schema al database...');
  execSync('npx prisma db push', { cwd: BACKEND, stdio: 'inherit', env: prismaEnv });
  log('PRISMA', 'Schema applicato');

  if (flags.noStart) {
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('  Setup completato.');
    console.log('  Per avviare i servizi:  node start.js');
    console.log('═══════════════════════════════════════════');
    console.log('');
    return;
  }

  log('BACKEND', 'Avvio backend in modalità sviluppo (hot-reload)...');
  const backendEnv = { ...process.env, NODE_ENV: 'development' };
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: BACKEND,
    stdio: 'pipe',
    shell: true,
    env: backendEnv,
  });
  backend.stdout.on('data', d => process.stdout.write(`[BACKEND] ${d}`));
  backend.stderr.on('data', d => process.stderr.write(`[BACKEND] ${d}`));

  await new Promise(r => setTimeout(r, 3000));

  const PRISMA_PORT = 5557;
  const prismaBin = path.join(
    BACKEND, 'node_modules', '.bin',
    IS_WIN ? 'prisma.cmd' : 'prisma'
  );

  log('PRISMA', `Avvio Prisma Studio su http://localhost:${PRISMA_PORT}...`);
  const studioArgs = ['studio', '--port', String(PRISMA_PORT), '--browser', 'none'];

  const prismaStudioEnv = { ...prismaEnv };
  const prismaStudio = spawn(prismaBin, studioArgs, {
    cwd: BACKEND,
    stdio: 'pipe',
    shell: true,
    env: prismaStudioEnv,
  });
  prismaStudio.stdout.on('data', d => process.stdout.write(`[PRISMA] ${d}`));
  prismaStudio.stderr.on('data', d => process.stderr.write(`[PRISMA] ${d}`));
  setTimeout(() => openBrowser(`http://localhost:${PRISMA_PORT}`), 8000);

  log('FRONTEND', 'Avvio frontend Ionic...');
  let frontendUrlOpened = false;
  const frontend = spawn('npm', ['start'], {
    cwd: FRONTEND,
    stdio: 'pipe',
    shell: true,
  });
  frontend.stdout.on('data', d => {
    process.stdout.write(`[FRONTEND] ${d}`);
    const msg = d.toString();
      if ((msg.includes('localhost:4200') || msg.includes('compiled successfully')) && !frontendUrlOpened) {
      frontendUrlOpened = true;
      setTimeout(() => openBrowser('http://localhost:4200'), 1500);
    }
  });
  frontend.stderr.on('data', d => process.stderr.write(`[FRONTEND] ${d}`));

  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('  Velmoria — servizi avviati');
  console.log('  Backend       → http://localhost:3000');
  console.log('  Frontend      → http://localhost:4200');
  console.log('  Prisma Studio → http://localhost:5557');
  console.log('');
  console.log('  Premi Ctrl+C per arrestare tutto.');
  console.log('═══════════════════════════════════════════');
  console.log('');

  const shutdown = () => {
    console.log('\n');
    log('STOP', 'Arresto in corso...');
    backend.kill('SIGTERM');
    frontend.kill('SIGTERM');
    prismaStudio.kill('SIGTERM');
    setTimeout(() => {
      backend.kill('SIGKILL');
      frontend.kill('SIGKILL');
      prismaStudio.kill('SIGKILL');
      process.exit(0);
    }, 5000);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  const cleanup = () => {};
  backend.on('exit', code => {
    cleanup();
    if (code !== 0 && code !== null) {
      log('ERR', `Backend terminato con codice ${code}`);
      frontend.kill();
      prismaStudio.kill();
      process.exit(code);
    }
  });
  frontend.on('exit', code => {
    cleanup();
    if (code !== 0 && code !== null) {
      log('ERR', `Frontend terminato con codice ${code}`);
      backend.kill();
      prismaStudio.kill();
      process.exit(code);
    }
  });
  prismaStudio.on('exit', code => {
    cleanup();
    if (code !== 0 && code !== null) {
      log('WARN', `Prisma Studio terminato con codice ${code}`);
    }
  });
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
