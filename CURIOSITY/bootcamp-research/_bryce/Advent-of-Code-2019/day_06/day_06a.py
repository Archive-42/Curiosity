from orbits import orbits;

class Node():
  def __init__(self, name, parent=None, child=None):
    self.name = name
    self.parent = parent
    self.children = [] if child is None else [child]
  def __repr__(self):
    return f"{self.name}"
  def num_orbits(self):
    return 0 if not self.parent else 1 + self.parent.num_orbits()
  def has_descendent(self, name):
    queue = [self]
    while queue:
      cur = queue.pop(0)
      if cur.name == name:
        return True
      queue += cur.children
    return False
  def distance_to_node(self, node):
    if self.name == node.name:
      return 0

    if self.has_descendent(node.name):
      for child in self.children:
        if child.has_descendent(node.name):
          return 1 + child.distance_to_node(node)
    elif node.has_descendent(self.name):
      for child in node.children:
        if child.has_descendent(self.name):
          return 1 + child.distance_to_node(self)
    else:
      return None

    


masses = {}

for orbit in orbits:
  parentName = orbit[:3]
  childName = orbit[-3:]
  if parentName in masses and childName in masses:
    masses[parentName].children.append(masses[childName])
    masses[childName].parent = masses[parentName]
  elif parentName in masses:
    newChild = Node(name=childName, parent=masses[parentName])
    masses[parentName].children.append(newChild)
    masses[childName] = newChild
  elif childName in masses:
    newParent = Node(name=parentName, child=masses[childName])
    masses[childName].parent = newParent
    masses[parentName] = newParent
  else:
    newParent = Node(name=parentName)
    masses[parentName] = newParent
    newChild = Node(name=childName, parent=newParent)
    masses[childName] = newChild
    masses[parentName].children.append(newChild)

total_orbits = 0
for massName, mass in masses.items():
  total_orbits += mass.num_orbits()
# print(total_orbits)