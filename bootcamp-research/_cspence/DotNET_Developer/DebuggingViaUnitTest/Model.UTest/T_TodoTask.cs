using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Model.UTest
{
    [TestClass]
    public class T_TodoTask
    {
        [TestMethod]
        public void ShouldThrowExceptionIfAlreadyDone()
        {
            // Arrange
            TodoTask task = new TodoTask("ForTest");

            // Act
            task.Done = true;

            // Assert
            Assert.ThrowsException<InvalidOperationException>(() => task.Done);
        }


        [TestMethod]
        public void CheckName()
        {
            // Arrange
            TodoTask task = new TodoTask("Task Name");

            // Act
            var name = task.Name;

            // Assert
            Assert.AreEqual("Task name", name);
        }
    }
}
