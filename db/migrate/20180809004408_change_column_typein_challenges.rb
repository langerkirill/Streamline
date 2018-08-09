class ChangeColumnTypeinChallenges < ActiveRecord::Migration[5.2]
  def change
    rename_column :challenges, :type, :workout_type
  end
end
