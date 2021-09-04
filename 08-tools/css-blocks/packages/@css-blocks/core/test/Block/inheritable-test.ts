import { assertNeverCalled } from "@opticss/util";
import { assert } from "chai";
import { suite, test } from "mocha-typescript";

import { Block, BlockClass, ResolvedConfiguration, RulesetContainer, SourceLocation } from "../../src";
import { Inheritable } from "../../src/BlockTree/Inheritable";

type RootNode = Inheritable<
  TestSource, // Self
  TestSource, // Root
  never,      // Parent
  TestNode    // Children
>;

class TestSource extends Inheritable<
  TestSource, // Self
  TestSource, // Root
  never,      // Parent
  TestNode    // Children
> {
  protected get ChildConstructor(): typeof TestNode { return TestNode; }
  lookup(): undefined { return undefined; }
  setBase(base: TestSource) {
    this._base = base;
  }
  get root(): RootNode["root"] { return this._root; }
  newChildNode: RootNode["newChild"] =
    (name: string) => this.newChild(name)

  getChildNode: RootNode["getChild"] =
    (key: string) => this.getChild(key)

  resolveChildNode: RootNode["resolveChild"] =
    (key: string) => this.resolveChild(key)

  setChildNode: RootNode["setChild"] =
    (key: string, value: TestNode) => this.setChild(key, value)

  ensureChildNode: RootNode["ensureChild"] =
    (name: string, key?: string) => this.ensureChild(name, key)

  childNodes: RootNode["children"] =
    () => this.children()

  childNodeHash: RootNode["childrenHash"] =
    () => this.childrenHash()

  childNodeMap: RootNode["childrenMap"] =
    () => this.childrenMap()

  resolveChildNodes: RootNode["children"] =
    () => this.resolveChildren()

  resolveChildNodeHash: RootNode["childrenHash"] =
    () => this.resolveChildrenHash()

  resolveChildNodeMap: RootNode["childrenMap"] =
    () => this.resolveChildrenMap()
}

type ContainerNode = Inheritable<TestNode, TestSource, TestSource, TestSink>;

const TEST_BLOCK = new Block("test", "tree");
class TestNode extends Inheritable<
  TestNode,   // Self
  TestSource, // Root
  TestSource, // Parent
  TestSink    // Children
> {
  get ChildConstructor(): typeof TestSink { return TestSink; }
  lookup(): undefined { return undefined; }
  get parent(): ContainerNode["parent"] { return this._parent!; }
  get root(): ContainerNode["root"] { return this.parent.root; }
  ensureSink: ContainerNode["ensureChild"] =
    (name: string, key?: string) => this.ensureChild(name, key)
  getSink: ContainerNode["getChild"] =
    (name: string) => this.getChild(name)
  resolveSink: ContainerNode["resolveChild"] =
    (name: string) => this.resolveChild(name)
}

type SinkNode = Inheritable<TestSink, TestSource, TestNode, never>;

class TestSink extends Inheritable<
  TestSink, // Self
  TestSource, // Root
  TestNode, // Parent
  never
  > {
  get ChildConstructor(): never { return assertNeverCalled(); }
  get parent(): SinkNode["parent"] { return this._parent!; }
  get root(): SinkNode["root"] { return this.parent.root; }
  // tslint:disable-next-line:prefer-whatever-to-any
  public lookup(_path: string, _errLoc?: SourceLocation | undefined): Inheritable<any, any, any, any> | undefined {
    throw new Error("Method not implemented.");
  }
  public rulesets: RulesetContainer<BlockClass>;
  constructor(name: string, parent: TestNode) {
    super(name, parent);
    this.rulesets = new RulesetContainer(new BlockClass(name, TEST_BLOCK));
  }

  public cssClass(_opts: ResolvedConfiguration): string {
    throw new Error("Method not implemented.");
  }
  public asSource(): string {
    throw new Error("Method not implemented.");
  }
  public asSourceAttributes(): Attr[] {
    throw new Error("Method not implemented.");
  }
}

@suite("Inheritable")
export class InheritableTests {

  @test "initial source node tree properties are as expected"() {
    let source = new TestSource("my-source");
    assert.equal(source.base, undefined);
    assert.equal(source.root, source);
    assert.deepEqual(source.resolveInheritance(), []);
  }

  @test "newChild creates new child, does not set it"() { // Note: this is why `newChild` is protected in Blocks
    let source = new TestSource("my-source");
    let child = source.newChildNode("child-node");
    assert.equal(source.getChildNode("child-node"), null);
    assert.equal(source.resolveChildNode("child-node"), null);
    assert.equal(child.parent, source);
    assert.equal(child.base, undefined);
    assert.equal(child.root, source);
  }

  @test "setChild adds new child to parent"() {
    let source = new TestSource("my-source");
    let child = source.newChildNode("child-node");
    source.setChildNode("child-key", child);
    assert.equal(source.getChildNode("child-key"), child);
    assert.equal(source.resolveChildNode("child-key"), child);
  }

  @test "ensureChild creates and adds new child to parent"() {
    let source = new TestSource("my-source");
    let child = source.ensureChildNode("child-node");
    assert.equal(source.getChildNode("child-node"), child);
    assert.equal(source.resolveChildNode("child-node"), child);
  }

  @test "ensureChild accepts optional key"() {
    let source = new TestSource("my-source");
    let child = source.ensureChildNode("child-node", "child-key");
    assert.equal(source.getChildNode("child-key"), child);
    assert.equal(source.resolveChildNode("child-key"), child);
  }

  @test "ensureChild will not overwrite existing nodes"() {
    let source = new TestSource("my-source");
    let child1 = source.ensureChildNode("child-node");
    let child2 = source.ensureChildNode("child-node");
    assert.equal(child1, child2);
  }

  @test "children accessor methods work as expected"() {
    let source = new TestSource("my-source");
    let child1 = source.ensureChildNode("child1");
    let child2 = source.ensureChildNode("child2");
    let child3 = source.ensureChildNode("child3", "custom-key");

    assert.deepEqual(source.childNodes(), [child1, child2, child3]);
    assert.deepEqual(source.childNodeHash(), {child1, child2, "custom-key": child3});
    assert.deepEqual([...source.childNodeMap().entries()], [["child1", child1], ["child2", child2], ["custom-key", child3]]);
  }

  @test "grandchildren have tree properties set as expected"() {
    let source = new TestSource("my-source");
    let child = source.ensureChildNode("child");
    let grandchild = child.ensureSink("grandchild");
    assert.equal(grandchild.parent, child);
    assert.equal(grandchild.base, undefined);
    assert.equal(grandchild.root, source);
    assert.deepEqual(grandchild.resolveInheritance(), []);
  }

  @test "setBase creates inheritance tree for self"() {
    let base = new TestSource("my-base");
    let source = new TestSource("my-source");
    source.setBase(base);
    assert.equal(source.base, base);
    assert.deepEqual(source.resolveInheritance(), [base]);
  }

  @test "setBase creates inheritance tree for children"() {
    let base = new TestSource("my-base");
    let source = new TestSource("my-source");
    let baseChild = base.ensureChildNode("child");
    let child = source.ensureChildNode("child");
    let baseUnique = base.ensureChildNode("base-only");
    source.setBase(base);

    assert.equal(child.base, baseChild);
    assert.equal(source.getChildNode("base-only"), null);
    assert.equal(source.resolveChildNode("base-only"), baseUnique);
    assert.deepEqual(child.resolveInheritance(), [baseChild]);

    assert.deepEqual(source.childNodes(), [child]);
    assert.deepEqual(source.childNodeHash(), {"child": child});
    assert.deepEqual([...source.childNodeMap().values()], [child]);
    assert.deepEqual(source.resolveChildNodes(), [child, baseUnique]);
    assert.deepEqual(source.resolveChildNodeHash(), { child, "base-only": baseUnique });
    assert.deepEqual([...source.resolveChildNodeMap().values()], [child, baseUnique]);
  }

  @test "setBase creates inheritance tree for grandchildren"() {
    let base = new TestSource("my-base");
    let source = new TestSource("my-source");
    let baseChild = base.ensureChildNode("child");
    let baseGrandchild = baseChild.ensureSink("grandchild");
    let baseChildUnique = baseChild.ensureSink("base-only");
    let child = source.ensureChildNode("child");
    let grandchild = child.ensureSink("grandchild");
    source.setBase(base);

    assert.equal(grandchild.base, baseGrandchild);
    assert.equal(source.getChildNode("child")!.getSink("base-only"), null);
    assert.equal(source.getChildNode("child")!.resolveSink("base-only"), baseChildUnique);
    assert.deepEqual(grandchild.resolveInheritance(), [baseGrandchild]);
  }
}
