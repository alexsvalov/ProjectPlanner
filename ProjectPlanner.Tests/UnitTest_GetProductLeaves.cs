using Microsoft.Build.Graph;
using ProjectPlanner.Services;
using System.ComponentModel;

namespace ProjectPlanner.Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {

        }
        /*
        [Test]
        
        public void Test1()
        {
            Dictionary<long, Dictionary<long, int>> testGraph = new Dictionary<long, Dictionary<long, int>>()
            {
                [1] = new Dictionary<long, int>()
            { 
                { 2, 2 }, 
                { 3, 1 },
                { 4, 1 },
            },
                [2] = new Dictionary<long, int>()
            {
                { 5, 3 },
                { 6, 4 },
            },
                [3] = new Dictionary<long, int>(),
                [4] = new Dictionary<long, int>()
            {
                { 2, 1 },
                { 7, 1 },
            },
                [5] = new Dictionary<long, int>(),
                [6] = new Dictionary<long, int>(),
                [7] = new Dictionary<long, int>(),
            };

            List<long> unvisited = new List<long>()
            {
                2, 5, 6, 4, 2, 5, 6, 7  
            };


            //List<KeyValuePair<int, List<int>>> visitedGraph = new()
            //{
            //    new KeyValuePair<int, List<int>>(1, new List<int>() { 2, 3 }),
            //    new KeyValuePair<int, List<int>>(2, new List<int>() { 5, 6 }),
            //    new KeyValuePair<int, List<int>>(3, new List<int>()),
            //    new KeyValuePair<int, List<int>>(4, new List<int>() { 2, 7 }),
            //    new KeyValuePair<int, List<int>>(5, new List<int>()),
            //    new KeyValuePair<int, List<int>>(6, new List<int>()),
            //    new KeyValuePair<int, List<int>>(7, new List<int>()),
            //    new KeyValuePair<int, List<int>>(2, new List<int>() { 5, 6 }),
            //};

            ProductGraph graph = new ProductGraph(testGraph);
            Dictionary<long, int> actual = graph.GetProductLeaves(new KeyValuePair<long, int>(1, 1));

            Dictionary<long, int> expected = new()
            {
                { 3, 1 },
                { 5, 9 },
                { 6, 12 },
                { 7, 1 },
            };

            Console.WriteLine($"---------------------------");
            Console.WriteLine($"expected");
            foreach (KeyValuePair<long, int> item in expected)
            {
                Console.WriteLine($"leaf: {item.Key}  quantity: {item.Value}");
            }
            Console.WriteLine($"---------------------------");

            Assert.That(actual, Is.EqualTo(expected));
        }
        
        */
    }
    
}