using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Заказ
/// </summary>
public partial class OrderProduct
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Номер заказа
    /// </summary>
    public int OrderNum { get; set; }

    /// <summary>
    /// Дата создания заказа
    /// </summary>
    public DateOnly CreateDate { get; set; }

    /// <summary>
    /// Дата выполнения заказа
    /// </summary>
    public DateOnly ExecDate { get; set; }

    /// <summary>
    /// Заказчик
    /// </summary>
    public long CustomerId { get; set; }

    /// <summary>
    /// Цена заказа без НДС
    /// </summary>
    public decimal PriceNum { get; set; }

    /// <summary>
    /// Расходы на доставку
    /// </summary>
    public decimal DeliveryCostNum { get; set; }

    public bool? IsActive { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<OrderCompose> OrderComposes { get; set; } = new List<OrderCompose>();

    public virtual ICollection<OrderCost> OrderCosts { get; set; } = new List<OrderCost>();

    public virtual ICollection<PlanCompose> PlanComposes { get; set; } = new List<PlanCompose>();
}
