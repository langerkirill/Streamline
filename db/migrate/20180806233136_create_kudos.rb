class CreateKudos < ActiveRecord::Migration[5.2]
  def change
    create_table :kudos do |t|
      t.integer :user_id, null:false
      t.integer :workout_id, null:false

      t.timestamps
    end
  end
end
