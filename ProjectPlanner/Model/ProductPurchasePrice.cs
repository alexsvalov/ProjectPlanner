using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Цена покупного изделия
/// </summary>
public partial class ProductPurchasePrice
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Изделие
    /// </summary>
    public long ProductId { get; set; }

    /// <summary>
    /// Дата начала действия
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Дата окончания действия
    /// </summary>
    public DateTime FinishDate { get; set; }

    /// <summary>
    /// Цена без НДС
    /// </summary>
    public decimal PriceNum { get; set; }

    public virtual Product Product { get; set; } = null!;
}
