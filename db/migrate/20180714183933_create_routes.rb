class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.float :start
      t.float :end

      t.timestamps
    end
  end
end
