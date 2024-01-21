using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Состав заказа
/// </summary>
public partial class OrderCompose
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Заказ
    /// </summary>
    public long OrderId { get; set; }

    /// <summary>
    /// Изделие
    /// </summary>
    public long ProductId { get; set; }

    /// <summary>
    /// Количество
    /// </summary>
    public int QuantityNum { get; set; }

    public virtual OrderProduct Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
