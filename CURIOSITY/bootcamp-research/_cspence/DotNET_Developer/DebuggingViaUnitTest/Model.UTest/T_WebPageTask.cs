using System;
using System.Threading;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Model.UTest
{
    [TestClass]
    public class T_WebPageTask
    {
        [TestMethod]
        public void CheckCreation()
        {
            // Arrange
            DateTime now = DateTime.Now;
            Thread.Sleep(1001);
            string name = "Astronomers Capture First Image of a Black Hole";
            string url = "https://www.eso.org/public/usa/news/eso1907/";
            ContentCategory category = ContentCategory.Science;

            // Act
            WebPageTask task = new WebPageTask(name, category, url);

            // Assert
            Assert.AreEqual(name, task.Name);
            Assert.AreEqual(category, task.Category);
            Assert.IsTrue(now < task.Start);
            Assert.AreEqual(url, task.Url.AbsolutePath);
        }        
    }
}
