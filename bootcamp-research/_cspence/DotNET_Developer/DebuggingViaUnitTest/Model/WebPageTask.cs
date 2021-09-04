using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace Model
{
    public class WebPageTask : ReadTask
    {
        public Uri Url { get; set; }
        public WebPageTask(string name, ContentCategory contentCategory, string url) : base(name, contentCategory)
        {
            Url = new Uri(url);            
        }        
    }
}
