class AddColumnToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :created_route, :float, array: true 
  end
end
