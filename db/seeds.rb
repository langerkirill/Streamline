# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Workout.destroy_all
#
#
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

Workout.create!(workout_type: "running", duration: 85,  miles: 13, date: DateTime.new(2201,8,12), user_id: mashu.id)
Workout.create!(workout_type: "running", duration: 99,  miles: 9, date: DateTime.new(2016,9,4), user_id: mashu.id)
Workout.create!(workout_type: "running", duration: 15,  miles: 2, date: DateTime.new(2018,5,6), user_id: mashu.id)

Workout.create!(workout_type: "running", duration: 16,  miles: 12, date: DateTime.new(2006,5,25), user_id: oscar.id)
Workout.create!(workout_type: "running", duration: 54,  miles: 11, date: DateTime.new(2009,12,12), user_id: oscar.id)
Workout.create!(workout_type: "running", duration: 44,  miles: 16, date: DateTime.new(2010,5,30), user_id: oscar.id)

Workout.create!(workout_type: "running", duration: 64,  miles: 5, date: DateTime.new(2018,5,12), user_id: abby.id)
Workout.create!(workout_type: "running", duration: 88,  miles: 11, date: DateTime.new(2017,4,15), user_id: abby.id)
Workout.create!(workout_type: "running", duration: 20,  miles: 10, date: DateTime.new(2015,6,16), user_id: abby.id)

Workout.create!(workout_type: "biking", duration: 15,  miles: 10, date: DateTime.new(2009,8,7), user_id: maurice.id)
Workout.create!(workout_type: "biking", duration: 46,  miles: 15, date: DateTime.new(2008,7,8), user_id: maurice.id)
Workout.create!(workout_type: "biking", duration: 22,  miles: 10, date: DateTime.new(2070,9,1), user_id: maurice.id)

Workout.create!(workout_type: "biking", duration: 13,  miles: 5, date: DateTime.new(2020,12,16), user_id: matthias.id)
Workout.create!(workout_type: "biking", duration: 11,  miles: 63, date: DateTime.new(2061,9,18), user_id: matthias.id)
Workout.create!(workout_type: "biking", duration: 41,  miles: 22, date: DateTime.new(2016,5,22), user_id: matthias.id)

Workout.create!(workout_type: "biking", duration: 453, miles: 10, date: DateTime.new(2020,9,10), user_id: brian.id)
Workout.create!(workout_type: "biking", duration: 54,  miles: 32, date: DateTime.new(2012,9,11), user_id: brian.id)
Workout.create!(workout_type: "biking", duration: 33,  miles: 3, date: DateTime.new(2018,9,1), user_id: brian.id)
