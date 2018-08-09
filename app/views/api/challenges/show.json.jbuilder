json.extract! @challenge, :id, :text, :workout_type, :title, :time_limit
json.userIds @challenge.users.ids
