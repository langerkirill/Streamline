class CreateChangeColumninWorkouts < ActiveRecord::Migration[5.1]
  def change
    create_table :change_columnin_workouts do |t|
      rename_column :workouts, :type, :workout_type
      
      t.timestamps
    end
  end
end
