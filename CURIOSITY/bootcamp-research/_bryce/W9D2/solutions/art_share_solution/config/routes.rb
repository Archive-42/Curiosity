Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :artworks, only: [:create, :destroy, :show, :update] do
    member do
      post :like, to: 'artworks#like', as: 'like'
      post :unlike, to: 'artworks#unlike', as: 'unlike'
      post :favorite, to: 'artworks#favorite', as: 'favorite'
      post :unfavorite, to: 'artworks#unfavorite', as: 'unfavorite'
    end
  end

  resources :artwork_shares, only: [:create, :destroy] do
    member do
      post :favorite, to: 'artwork_shares#favorite', as: 'favorite'
      post :unfavorite, to: 'artwork_shares#unfavorite', as: 'unfavorite'
    end
  end

  resources :users, only: [:create, :destroy, :index, :show, :update] do
    resources :artworks, only: [:index]
    resources :collections, only: [:index]
  end

  resources :comments, only: [:index, :create, :destroy] do
    member do
      post :like, to: 'comments#like', as: 'like'
      post :unlike, to: 'comments#unlike', as: 'unlike'
    end
  end

  resources :collections, only: [:create, :show, :destroy] do
    resources :artworks, only: [:index] do
      post :add, to: 'collections#add_artwork', as: 'add'
      delete :remove, to: 'collections#remove_artwork', as: 'remove'
    end
  end
end
