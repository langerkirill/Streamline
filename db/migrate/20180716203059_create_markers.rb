class CreateMarkers < ActiveRecord::Migration[5.2]
  def change
    create_table :markers do |t|
      t.float :lat, null:false
      t.float :lng, null:false
      t.integer :route_id, null:false

      t.timestamps
    end
  end
end
