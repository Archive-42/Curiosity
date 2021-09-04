using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Model.UTest
{
    [TestClass]
    public class T_TodoModel
    {
        [TestMethod]
        public void VerifyAddTasks()
        {
            // Arrange
            var model = new TodoModel();

            // Act
            foreach (var taskName in GetTaskNames())
            {
                model.CreateTask(taskName);
            }

            // Assert
            Assert.AreEqual(4, model.Tasks.Count());
        }
        


        private IEnumerable<string> GetTaskNames()
        {
            yield return "sleep";
            yield return "work";
            yield return "play Diablo";
            yield return "sleep";
        }
    }
}
