class AddToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :miles, :float
    add_column :routes, :duration, :integer
    add_column :routes, :elevation, :integer
  end
end
