using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Состав плана производства
/// </summary>
public partial class PlanCompose
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// План производства
    /// </summary>
    public long PlanProductId { get; set; }

    /// <summary>
    /// Заказ
    /// </summary>
    public long OrderProductId { get; set; }

    public virtual OrderProduct OrderProduct { get; set; } = null!;

    public virtual PlanProduct PlanProduct { get; set; } = null!;
}
