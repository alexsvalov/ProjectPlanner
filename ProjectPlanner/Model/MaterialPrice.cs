using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Цена материала
/// </summary>
public partial class MaterialPrice
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Материал
    /// </summary>
    public long MaterialId { get; set; }

    /// <summary>
    /// Дата начала действия
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Дата окончания действия
    /// </summary>
    public DateTime FinishDate { get; set; }

    /// <summary>
    /// Цена с НДС за 1 т
    /// </summary>
    public decimal PriceNum { get; set; }

    /// <summary>
    /// Признак ручного ввода
    /// </summary>
    public bool IsManual { get; set; }

    public virtual Material Material { get; set; } = null!;
}
