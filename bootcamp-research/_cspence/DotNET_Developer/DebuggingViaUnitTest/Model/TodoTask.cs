using System;

namespace Model
{
    public class TodoTask
    {
        public TodoTask(string name)
        {
            Name = name;
            Start = DateTime.Now;
        }

        public string Name { get; }

        public bool Done
        {
            get => End.HasValue;

            set
            {
                if (End.HasValue)
                    throw new InvalidOperationException($"Task {Name} has been finished {End}.");

                End = DateTime.Now;
            }
        }

        public DateTime Start { get; set; }

        public DateTime? End { get; set; }
    }
}
