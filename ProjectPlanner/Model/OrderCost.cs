﻿using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Себестоимость заказа
/// </summary>
public partial class OrderCost
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Заказ
    /// </summary>
    public long OrderProductId { get; set; }

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

    public virtual OrderProduct OrderProduct { get; set; } = null!;
}
