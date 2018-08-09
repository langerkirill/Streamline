class CreateChallengesUsersJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :challenges, :users
  end
end
