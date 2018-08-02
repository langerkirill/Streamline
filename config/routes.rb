Rails.application.routes.draw do

  namespace :api do
    get 'comments/new'
    get 'comments/create'
    get 'comments/destroy'
  end
  root to: 'static_pages#root'
  # we namespace the routes that return json specifically under api
  # all of these controller actions will return json.  We only need data now, not html
  # 'everything inside of this block should be organized under api'
  # these controllers will live under a directory of api
  namespace :api, defaults: { format: 'json' } do
      # <-- responses by default should be json
    get 'markers/created_routes', :to => 'markers#created_routes'
    resources :comments, except: [:index]
    resources :markers, except: [:show, :index]
    resources :users do
      resources :routes, only: [:index]
      resources :workouts, only: [:index]
    end
    resources :workouts do
      resources :comments, only: [:index]
    end
    resource :session, only: [:new, :create, :destroy]
    resources :routes do
      resources :markers, only: [:show, :index]
    end
  end
end
