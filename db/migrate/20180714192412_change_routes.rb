class ChangeRoutes < ActiveRecord::Migration[5.2]
  def change
    rename_column :routes, :start, :startlat
    rename_column :routes, :end, :startlong
    add_column :routes, :endlat, :float
    add_column :routes, :endlong, :float
  end
end
