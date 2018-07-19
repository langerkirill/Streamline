class ChangeWorkoutElevation < ActiveRecord::Migration[5.2]
  def change
    change_column :workouts, :elevation, :integer, using: '(elevation::integer)'
  end
end
