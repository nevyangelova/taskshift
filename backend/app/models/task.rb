class Task < ApplicationRecord
  # Associations
  belongs_to :project
  
  # Validations
  validates :name, presence: true
end