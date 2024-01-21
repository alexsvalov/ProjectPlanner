using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Тип изделия
/// </summary>
public partial class ProductTypeDict
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Наименование
    /// </summary>
    public string Name { get; set; } = null!;

    public string Ident { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
