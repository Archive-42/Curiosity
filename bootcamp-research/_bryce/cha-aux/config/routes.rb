Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: %i[create destroy]
    resources :users, only: %i[create]
    resources :servers, only: %i[create destroy index show update]
    resources :channels, only: %i[create destroy index show update]
  end

end
