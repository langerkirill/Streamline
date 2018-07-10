class CreateWorkouts < ActiveRecord::Migration[5.1]
  def change
    create_table :workouts do |t|
      t.string :type
      t.integer :duration, null:false
      t.integer :miles, null:false
      t.date :date, null:false
      t.integer :route_id
      t.integer :user_id

      t.timestamps
    end
    add_index :workouts, :date
    add_index :workouts, :user_id
  end
end
