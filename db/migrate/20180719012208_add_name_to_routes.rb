class AddNameToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :name, :string
  end
end
