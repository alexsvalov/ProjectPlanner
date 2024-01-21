using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Покупное изделие
/// </summary>
public partial class ProductPurchase
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
    /// Цена без НДС
    /// </summary>
    public decimal PriceNum { get; set; }

    public bool? IsActive { get; set; }

    public virtual Product Product { get; set; } = null!;
}
