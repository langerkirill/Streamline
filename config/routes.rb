Rails.application.routes.draw do

  root to: 'static_pages#root'
  # we namespace the routes that return json specifically under api
  # all of these controller actions will return json.  We only need data now, not html
  # 'everything inside of this block should be organized under api'
  # these controllers will live under a directory of api
  namespace :api, defaults: { format: 'json' } do  # <-- responses by default should be json
    resources :users
    resources :workouts
    resource :session
  end
end
