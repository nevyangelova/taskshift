module Types
  class QueryType < Types::BaseObject
    field :projects, [Types::ProjectType], null: false,
      description: "Returns a list of projects"
    
    field :project, Types::ProjectType, null: true do
      description "Find a project by ID"
      argument :id, ID, required: true
    end

    def projects
      Project.all
    end

    def project(id:)
      Project.find(id)
    end
  end
end