import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./service/services/auth-guard.service";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/lodingpage',
    pathMatch: 'full'
  },
  {
    path: 'lodingpage',
    loadChildren: () => import('./pages/lodingpage/lodingpage.module').then(m => m.LodingpagePageModule)
  },
  {
    path: 'firstpage',
    loadChildren: () => import('./pages/first-page/first-page.module').then(m => m.FirstPagePageModule)

  },
  {
    path: 'pages/login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'pages/register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'folder/ShopAll/categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule),
    canActivate: [AuthGuardService]

  },
  {
    path: 'productdetail/:id',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailPageModule),
    canActivate: [AuthGuardService]

  },
  {
    path: 'folder/sale-item',
    loadChildren: () => import('./pages/sale-item/sale-item.module').then(m => m.SaleItemPageModule),
    canActivate: [AuthGuardService]

  },
  {
    path: 'folder/ShopAll/contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'list/:link/:subcategories/:check',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'folder/subcategory/:id',
    loadChildren: () => import('./pages/subcategories/subcategories.module').then(m => m.SubcategoriesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'lastpage',
    loadChildren: () => import('./pages/lastpage/lastpage.module').then(m => m.LastpagePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
