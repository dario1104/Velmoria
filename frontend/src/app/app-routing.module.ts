import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  { path: 'verify-email', loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailPageModule) },
  { path: 'verify-2fa', loadChildren: () => import('./verify-2fa/verify-2fa.module').then(m => m.Verify2faPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },

  { path: 'trips', loadChildren: () => import('./trips/trips.module').then(m => m.TripsPageModule), canActivate: [AuthGuard] },
  { path: 'trip-detail/:id', loadChildren: () => import('./trip-detail/trip-detail.module').then(m => m.TripDetailPageModule), canActivate: [AuthGuard] },
  { path: 'trip-form', loadChildren: () => import('./trip-form/trip-form.module').then(m => m.TripFormPageModule), canActivate: [AuthGuard] },
  { path: 'trip-form/:id', loadChildren: () => import('./trip-form/trip-form.module').then(m => m.TripFormPageModule), canActivate: [AuthGuard] },
  { path: 'itinerary/:tripId', loadChildren: () => import('./itinerary/itinerary.module').then(m => m.ItineraryPageModule), canActivate: [AuthGuard] },
  { path: 'gallery/:tripId', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryPageModule), canActivate: [AuthGuard] },
  { path: 'expenses/:tripId', loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesPageModule), canActivate: [AuthGuard] },
  { path: 'packing/:tripId', loadChildren: () => import('./packing/packing.module').then(m => m.PackingPageModule), canActivate: [AuthGuard] },
  { path: 'activities/:tripId', loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesPageModule), canActivate: [AuthGuard] },
  { path: 'replay/:tripId', loadChildren: () => import('./replay/replay.module').then(m => m.ReplayPageModule), canActivate: [AuthGuard] },
  { path: 'stats/:tripId', loadChildren: () => import('./stats-dashboard/stats-dashboard.module').then(m => m.StatsDashboardPageModule), canActivate: [AuthGuard] },
  { path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapPageModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard] },
  { path: 'edit-profile', loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule), canActivate: [AuthGuard] },
  { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule), canActivate: [AuthGuard] },
  { path: 'privacy-settings', loadChildren: () => import('./privacy-settings/privacy-settings.module').then(m => m.PrivacySettingsPageModule), canActivate: [AuthGuard] },
  { path: 'device-management', loadChildren: () => import('./device-management/device-management.module').then(m => m.DeviceManagementPageModule), canActivate: [AuthGuard] },
  { path: 'badges', loadChildren: () => import('./badges/badges.module').then(m => m.BadgesPageModule), canActivate: [AuthGuard] },
  { path: 'import-export', loadChildren: () => import('./import-export/import-export.module').then(m => m.ImportExportPageModule), canActivate: [AuthGuard] },
  { path: 'friends', loadChildren: () => import('./friends/friends.module').then(m => m.FriendsPageModule), canActivate: [AuthGuard] },
  { path: 'followers', loadChildren: () => import('./followers/followers.module').then(m => m.FollowersPageModule), canActivate: [AuthGuard] },
  { path: 'following', loadChildren: () => import('./following/following.module').then(m => m.FollowingPageModule), canActivate: [AuthGuard] },
  { path: 'user-search', loadChildren: () => import('./user-search/user-search.module').then(m => m.UserSearchPageModule), canActivate: [AuthGuard] },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule), canActivate: [AuthGuard] },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule), canActivate: [AuthGuard] },
  { path: 'chat/conversation/:userId', loadChildren: () => import('./conversation/conversation.module').then(m => m.ConversationPageModule), canActivate: [AuthGuard] },
  { path: 'explore', loadChildren: () => import('./explore/explore.module').then(m => m.ExplorePageModule), canActivate: [AuthGuard] },
  { path: 'place-detail/:poiId', loadChildren: () => import('./place-detail/place-detail.module').then(m => m.PlaceDetailPageModule), canActivate: [AuthGuard] },
  { path: 'review-form/:poiId', loadChildren: () => import('./review-form/review-form.module').then(m => m.ReviewFormPageModule), canActivate: [AuthGuard] },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule), canActivate: [AuthGuard] },
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistPageModule), canActivate: [AuthGuard] },
  { path: 'admin/dashboard', loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardPageModule), canActivate: [AuthGuard] },
  { path: 'admin/users', loadChildren: () => import('./admin/users/users.module').then(m => m.UsersPageModule), canActivate: [AuthGuard] },
  { path: 'admin/moderation', loadChildren: () => import('./admin/moderation/moderation.module').then(m => m.ModerationPageModule), canActivate: [AuthGuard] },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },

  { path: '', redirectTo: 'tabs/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
