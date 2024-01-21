using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Составное изделие
/// </summary>
public partial class ProductCompose
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
    /// Составная часть
    /// </summary>
    public long ComponentId { get; set; }

    /// <summary>
    /// Количество
    /// </summary>
    public int QuantityNum { get; set; }

    public virtual Product Component { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
