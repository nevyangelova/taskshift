Project.destroy_all

# Create projects
project1 = Project.create!(name: "Website Redesign")
project2 = Project.create!(name: "Mobile App Development")

# Create tasks for Project 1
Task.create!(name: "Design homepage mockup", project: project1)
Task.create!(name: "Implement responsive navigation", project: project1)
Task.create!(name: "Optimize images", project: project1)
Task.create!(name: "Add contact form", project: project1)
Task.create!(name: "Cross-browser testing", project: project1)

# Create tasks for Project 2
Task.create!(name: "Create wireframes", project: project2)
Task.create!(name: "Develop user authentication", project: project2)
Task.create!(name: "Implement push notifications", project: project2)
Task.create!(name: "Build settings screen", project: project2)
Task.create!(name: "App store submission", project: project2)

puts "Seed data created successfully!"