def what_was_that_one_with(those_actors)
  # Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.
  Movie.select(:title, :id).joins(castings: :actor).where("actors.name IN (?)", those_actors).group("movies.id").having("COUNT(actors.id) = (?)", those_actors.size)
end

def golden_age
  # Find the decade with the highest average movie score.
  Movie.select('(yr/10) * 10 as decade, AVG(score)').group('decade').order('AVG(score) DESC').first.decade

end

def costars(name)
  # List the names of the actors that the named actor has ever
  # appeared with.
  # Hint: use a subquery
  movie_appearances = Movie.select(:id).joins(castings: :actor).where("actors.name = (?)", name)
  Actor.joins(castings: :movie).where("movies.id IN (?) AND actors.name != (?)", movie_appearances, name).distinct.pluck(:name)
end

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie
  Actor.select(:name).left_outer_joins(:castings).where("castings.actor_id IS NULL").count
end

def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the
  # letters in whazzername, ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but
  # not like "stallone sylvester" or "zylvester ztallone"

  new_name = whazzername.chars.join("%")
  Movie.joins(castings: :actor).where("actors.name ilike (?)", "%#{new_name}%")
end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names. Show each actor's id, name, and the length of
  # their career.
  Actor
    .select("actors.id, actors.name, (MAX(movies.yr) - MIN(movies.yr)) AS career")
    .joins(castings: :movie)
    .group("actors.id")
    .order("career DESC")
    .limit(3)
end
