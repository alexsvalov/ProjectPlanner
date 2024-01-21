using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Себестоимость изделия
/// </summary>
public partial class ProductCost
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
    /// Стоимость покупных изделий
    /// </summary>
    public decimal PurchaseCostNum { get; set; }

    /// <summary>
    /// Материальные затраты
    /// </summary>
    public decimal MaterialCostNum { get; set; }

    /// <summary>
    /// Расходы на оплату труда
    /// </summary>
    public decimal LabourCostNum { get; set; }

    /// <summary>
    /// Общие расходы
    /// </summary>
    public decimal TotalCostNum { get; set; }

    /// <summary>
    /// Дата начала действия
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Дата окончания действия
    /// </summary>
    public DateTime FinishDate { get; set; }

    /// <summary>
    /// Постоянные расходы
    /// </summary>
    public decimal FixedCostNum { get; set; }

    public virtual Product Product { get; set; } = null!;
}
