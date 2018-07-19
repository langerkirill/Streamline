# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Workout.destroy_all
Route.destroy_all

mashu = User.new(username: "Mashu-rella", password: "hunter12")
file = EzDownload.open('https://s3.amazonaws.com/streamline-application-dev/MashuDuek.jpg')
mashu.image.attach(io: file, filename: 'MashuDuek.jpg')
mashu.save!

brian = User.new(username: "Brie-an", password: "hunter12")
file = EzDownload.open('https://s3.amazonaws.com/streamline-application-dev/BrianScott.jpg')
brian.image.attach(io: file, filename: 'BrianScott.jpg')
brian.save!

maurice = User.new(username: "Peppa-J", password: "hunter12")
file = EzDownload.open('https://s3.amazonaws.com/streamline-application-dev/MauriceRoach.jpg')
maurice.image.attach(io: file, filename: 'MauriceRoach.jpg')
maurice.save!

abby = User.new(username: "Feta!", password: "hunter12")
file = EzDownload.open('https://s3.amazonaws.com/streamline-application-dev/AbigailHersh.jpg')
abby.image.attach(io: file, filename: 'AbigailHersh.jpg')
abby.save!

oscar = User.new(username: "Osc-iago", password: "hunter12")
file = EzDownload.open('https://s3.amazonaws.com/streamline-application-dev/OscarAlvarez.jpg')
oscar.image.attach(io: file, filename: 'OscarAlvarez.jpg')
oscar.save!

matthias = User.new(username: "Mr. Swiss", password: "hunter12")
file = EzDownload.open('https://s3.amazonaws.com/streamline-application-dev/MatthiasJenny.jpg')
matthias.image.attach(io: file, filename: 'MatthiasJenny.jpg')
matthias.save!

route1 = Route.create!(user_id: mashu.id, startlat: 40.799676, startlong: -73.935754, endlat:40.781130, endlong:-73.984469)
route2 = Route.create!(user_id: mashu.id, startlat: 40.711421, startlong: -73.999611, endlat:40.788974, endlong:-73.947805)

Workout.create!(workout_type: "running", title: "Long Run", route_id: route1.id, elevation: 50, achievments: "15", duration: 85,  miles: 13, date: DateTime.new(2018,8,12), user_id: mashu.id)
Workout.create!(workout_type: "running", title: "3 Marathons", route_id: route2.id, elevation: 50, achievments: "15", duration: 99,  miles: 9, date: DateTime.new(2018,9,4), user_id: mashu.id)
Workout.create!(workout_type: "running", title: "Over the Hill", route_id: 3, elevation: 50, achievments: "15", duration: 15,  miles: 2, date: DateTime.new(2018,5,6), user_id: mashu.id)

Workout.create!(workout_type: "running", title: "I did a jog", route_id: 4, elevation: 50, achievments: "15", duration: 16,  miles: 12, date: DateTime.new(2018,5,25), user_id: oscar.id)
Workout.create!(workout_type: "running", title: "Better than coding", route_id: 5, elevation: 50, achievments: "15", duration: 54,  miles: 11, date: DateTime.new(2018,12,12), user_id: oscar.id)
Workout.create!(workout_type: "running", title: "Active Record", route_id: 6, elevation: 50, achievments: "15", duration: 44,  miles: 16, date: DateTime.new(2018,5,30), user_id: oscar.id)

Workout.create!(workout_type: "running", title: "Fast AF", route_id: 7, elevation: 50, achievments: "15", duration: 64,  miles: 5, date: DateTime.new(2018,5,12), user_id: abby.id)
Workout.create!(workout_type: "running", title: "Impossible Run", route_id: 8, elevation: 50, achievments: "15", duration: 88,  miles: 11, date: DateTime.new(2018,4,15), user_id: abby.id)
Workout.create!(workout_type: "running", title: "Jog", route_id: 9, elevation: 50, achievments: "15", duration: 20,  miles: 10, date: DateTime.new(2018,6,16), user_id: abby.id)

Workout.create!(workout_type: "biking", title: "Outing", route_id: 10, elevation: 50, achievments: "15", duration: 15,  miles: 10, date: DateTime.new(2018,8,7), user_id: maurice.id)
Workout.create!(workout_type: "biking", title: "Bike in Place", route_id: 11, elevation: 50, achievments: "15", duration: 46,  miles: 15, date: DateTime.new(2018,7,8), user_id: maurice.id)
Workout.create!(workout_type: "biking", title: "Ride Bike", route_id: 12, elevation: 50, achievments: "15", duration: 22,  miles: 10, date: DateTime.new(2018,9,1), user_id: maurice.id)

Workout.create!(workout_type: "biking", title: "Ride It", route_id: 13, elevation: 50, achievments: "15", duration: 13,  miles: 5, date: DateTime.new(2018,12,16), user_id: matthias.id)
Workout.create!(workout_type: "biking", title: "Get Biked", route_id: 14, elevation: 50, achievments: "15", duration: 11,  miles: 63, date: DateTime.new(2018,9,18), user_id: matthias.id)
Workout.create!(workout_type: "biking", title: "Bike with friends", route_id: 15, elevation: 50, achievments: "15", duration: 41,  miles: 22, date: DateTime.new(2018,5,22), user_id: matthias.id)

Workout.create!(workout_type: "biking", title: "Bike for 3 days straight", route_id: 16, elevation: 50, achievments: "15", duration: 453, miles: 10, date: DateTime.new(2018,9,10), user_id: brian.id)
Workout.create!(workout_type: "biking", title: "Much Bike", route_id: 17, elevation: 50, achievments: "15", duration: 54,  miles: 32, date: DateTime.new(2018,9,11), user_id: brian.id)
Workout.create!(workout_type: "biking", title: "BIIIKKKEE", route_id: 18, elevation: 50, achievments: "15", duration: 33,  miles: 3, date: DateTime.new(2018,9,1), user_id: brian.id)
