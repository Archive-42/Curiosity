using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Model
{
    public class ReadTask : TodoTask
    {
        public ContentCategory Category { get; set; }

        public ReadTask(string name, ContentCategory contentCategory) : base(name)
        {
            
        }
    }

    public enum ContentCategory
    {
        Science,
        ScienceFiction,
        ComputerScience,
        Sport,
        History
    }
}
