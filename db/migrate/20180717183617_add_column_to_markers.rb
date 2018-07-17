class AddColumnToMarkers < ActiveRecord::Migration[5.2]
  def change
    add_column :markers, :order, :integer
  end
end
