using ProjectPlanner.Model;

namespace ProjectPlanner.Services
{
    public class ProductGraph
    {
        private readonly DbPlannerContext _context;

        public ProductGraph(DbPlannerContext context)
        {
            _context = context;
        }

        private List<long> visited = new();

        public Dictionary<long, int> CalculateProductDetailsOrPurchases(KeyValuePair<long, int> rootVertex, ProductGraphLeavesEnum leaf)
        {
            Dictionary<long, int> leaves = new();
            Queue<KeyValuePair<long, int>> queue = new();
            queue.Enqueue(rootVertex);

            while (queue.Any())
            {
                KeyValuePair<long, int> peekQueue = queue.Dequeue();

                bool leafType = false;

                if (leaf == ProductGraphLeavesEnum.DETAIL)
                    leafType = IsProductDetail(peekQueue.Key);
                if (leaf == ProductGraphLeavesEnum.PURCHASE)
                    leafType = IsProductPurchase(peekQueue.Key);

                if (leafType)
                {
                    if (leaves.ContainsKey(peekQueue.Key))
                    {
                        leaves[peekQueue.Key] += peekQueue.Value;
                    }
                    else
                    {
                        leaves.Add(peekQueue.Key, peekQueue.Value);
                    }
                }

                List<KeyValuePair<long, int>>? components = GetComponents(peekQueue.Key);

                if (components != null)
                {
                    foreach (KeyValuePair<long, int> item in components)
                    {
                        KeyValuePair<long, int> temp = 
                            new(item.Key, item.Value * peekQueue.Value);
                        queue.Enqueue(temp);
                    }
                }
            }
            return leaves;
        }

        public bool IsProductDetail(long id)
        {
            return _context.ProductDetails.Where(x => x.ProductId == id).Any();
        }

        public bool IsProductPurchase(long id)
        {
            return _context.ProductPurchases.Where(x => x.ProductId == id).Any();
        }

        public List<KeyValuePair<long, int>>? GetComponents(long v)
        {
            var query =
                from pc in _context.ProductComposes
                where pc.ProductId == v
                select new KeyValuePair<long, int>
                (
                    pc.ComponentId,
                    pc.QuantityNum
                );
            return query?.ToList();
        }

        public Dictionary<long, int> CalculateProductDetails(long productId)
        {
            return CalculateProductDetailsOrPurchases(new KeyValuePair<long, int>(productId, 1), 
                                                    ProductGraphLeavesEnum.DETAIL);
        }

        public Dictionary<long, int> CalculateProductPurchases(long productId)
        {
            return CalculateProductDetailsOrPurchases(new KeyValuePair<long, int>(productId, 1), 
                                                    ProductGraphLeavesEnum.PURCHASE);
        }

        public long GetUnvisitedVertex(long v)
        {
            List<long>? components = GetComponents(v)?.Select(x => x.Key).ToList();
            if (components == null)
                return -1;
            foreach (long item in components)
            {
                if (!visited.Contains(item))
                    return item;
            }
            return -1;
        }

        public bool FindCycle(long rootVertex, long newVertex)
        {
            Stack<long> stack = new();
            stack.Push(rootVertex);
            stack.Push(newVertex);
            visited.Add(newVertex);

            while (stack.Any())
            {
                long unvisitedVertex = GetUnvisitedVertex(stack.Peek());
                if (stack.Contains(unvisitedVertex))
                    return true;

                if (unvisitedVertex == -1)
                    stack.Pop();
                else
                {
                    visited.Add(unvisitedVertex);
                    stack.Push(unvisitedVertex);                    
                }
            }
            return false;
        }
    }
}