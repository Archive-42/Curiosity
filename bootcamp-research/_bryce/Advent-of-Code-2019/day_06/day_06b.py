from orbits import orbits
from day_06a import *

start = masses['YOU'].parent
end = masses['SAN'].parent

cur = masses['YOU'].parent
ancestor = None
while not ancestor:
  if cur.has_descendent('YOU') and cur.has_descendent('SAN'):
    ancestor = cur
  else:
    cur = cur.parent
# print(ancestor)
total_jumps = ancestor.distance_to_node(start) + ancestor.distance_to_node(end)
print(total_jumps)
