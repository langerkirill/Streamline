class CreateChallenges < ActiveRecord::Migration[5.2]
  def change
    create_table :challenges do |t|
      t.string :title, null:false
      t.string :type, null:false
      t.string :text, null:false
      t.string :img, null:false
      t.date :time_limit, null:false

      t.timestamps
    end
  end
end
