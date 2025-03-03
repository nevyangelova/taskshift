class Project < ApplicationRecord
  # Associations
  has_many :tasks, dependent: :destroy
  
  # Validations
  validates :name, presence: true
end