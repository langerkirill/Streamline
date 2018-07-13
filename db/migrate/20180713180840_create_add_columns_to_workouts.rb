class CreateAddColumnsToWorkouts < ActiveRecord::Migration[5.2]
  def change
    create_table :add_columns_to_workouts do |t|
      add_column :workouts, :title, :string
      add_column :workouts, :elevation, :string
      add_column :workouts, :achievments, :integer
      add_column :users, :fname, :string
      add_column :users, :lname, :string

      t.timestamps
    end
  end
end
