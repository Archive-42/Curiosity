using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class BookTask : ReadTask
    {
        public string Author { get; set; }
        public string Title { get; set; }

        public BookTask(string name, ContentCategory contentCategory, string author, string title) : base(name, contentCategory)
        {
        }
    }
}
