class AddTypeToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :route_type, :string
  end
end
