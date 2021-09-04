Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'subs#index'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  resources :subs, except: :destroy

  resources :posts, only: [:new, :edit, :update, :destroy, :create, :show] do
    resource :comments, only: [:new]
  end

  resources :comments, only: [:create,:show]
end
